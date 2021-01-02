import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { renderToString } from "react-dom/server";
import Home from './Home';

describe("home tests", () => {
    it('renders something', () => {
        const component = renderToString(<Home />)

        expect(component).toContain('New Patient');
    })

    it('clicking on a button navigates to a new route', () => {
        const component = render(<Home />);
        const buttons = component.container.querySelectorAll('button');
        expect(buttons).toHaveLength(2);
        fireEvent.click(buttons[0]);
        expect(window.location.pathname).toEqual('/newpatient');
    })

})