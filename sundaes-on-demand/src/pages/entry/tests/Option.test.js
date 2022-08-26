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

})