import {
    fireEvent,
    render,
    screen,
    within,
    waitFor,
} from '@testing-library/react';
import Home from './index';
import { DataProvider, api } from '../../contexts/DataContext';

const mockData = {
    events: [
        {
            id: 1,
            title: 'Événement A',
            date: '2022-01-01',
            cover: '/a.png',
            type: 'conf',
        },
        {
            id: 2,
            title: 'Événement B',
            date: '2022-02-01',
            cover: '/b.png',
            type: 'conf',
        },
    ],
    focus: [],
};

describe('When Form is created', () => {
    it('a list of fields card is displayed', async () => {
        render(<Home />);
        await screen.findByText('Email');
        await screen.findByText('Nom');
        await screen.findByText('Prénom');
        await screen.findByText('Personel / Entreprise');
    });

    describe('and a click is triggered on the submit button', () => {
        it('the success message is displayed', async () => {
            render(<Home />);
            fireEvent(
                await screen.findByText('Envoyer'),
                new MouseEvent('click', {
                    cancelable: true,
                    bubbles: true,
                })
            );
            await screen.findByText('En cours');
            await screen.findByText('Message envoyé !');
        });
    });
});

describe('When a page is created', () => {
    beforeEach(async () => {
        api.loadData = jest.fn().mockResolvedValue(mockData);
        render(
            <DataProvider>
                <Home />
            </DataProvider>
        );
        await waitFor(() => expect(api.loadData).toHaveBeenCalled());
    });

    it('a list of events is displayed', async () => {
        await screen.findByText('Catégories');
        const eventsContainer = document.getElementById('events');

        const cards = await within(eventsContainer).findAllByTestId(
            'card-testid'
        );

        expect(cards).toHaveLength(mockData.events.length);
    });

    it('a list a people is displayed', async () => {
        const heading = await screen.findByText(
            'Une équipe d’experts dédiés à l’ogranisation de vos événements'
        );
        const peopleSection = heading.closest('section');

        const cards = await within(peopleSection).findAllByTestId(
            'card-image-testid'
        );

        expect(cards).not.toHaveLength(0);
    });

    it('a footer is displayed', async () => {
        const footer = await screen.findByRole('contentinfo');
        expect(footer).toBeInTheDocument();
        expect(
            within(footer).getByText('Notre dernière prestation')
        ).toBeInTheDocument();
        expect(within(footer).getByText('Contactez-nous')).toBeInTheDocument();
    });

    it('an event card, with the last event, is displayed', async () => {
        const footer = await screen.findByRole('contentinfo');
        const img = await within(footer).findByTestId('card-image-testid');

        expect(img).toBeInTheDocument();
    });
});
