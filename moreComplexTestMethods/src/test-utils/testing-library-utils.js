import { render } from '@testing-library/react';
import { OrderdetailProvider } from '../contexts/OrderDetail';

const renderWithContext = (ui, options) =>
    render(ui, { wrapper: OrderdetailProvider, ...options });

//re export everything
export * from '@testing-library/react';

//override render method
export { renderWithContext as render };
