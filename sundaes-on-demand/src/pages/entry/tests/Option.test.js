import { render, screen } from '@testing-library/react';

import Option from '../Options';

test('display image for each scoop option form server', async () => {
    render(<Option optionType="scoops" />);

    //find images
    //we use await findallby instead of screen.getAllByRole because images came from asyncapi call 
    const scoopImages = await screen.findAllByRole('img',
        {
            name: /scoop$/i // $ is regular expration that string end with scoop
        });

    // our mock service return 2 option 
    expect(scoopImages).toHaveLength(2);

    //confirm alt text of images
    const altText = scoopImages.map((element) => element.alt);
    expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop'])

});


test('display image for each toppings option form server', async () => {
    render(<Option optionType="toppings" />);

    //find images
    //we use await findallby instead of screen.getAllByRole because images came from asyncapi call 
    const toppingImages = await screen.findAllByRole('img',
        {
            name: /toppping$/i // $ is regular expration that string end with scoop
        });

    // our mock service return 3 option 
    expect(toppingImages).toHaveLength(3);

    //confirm alt text of images
    const altText = toppingImages.map((element) => element.alt);
    expect(altText).toEqual(['Cherries tooping', 'M&Ms tooping', 'Hot fudge tooping'])

});