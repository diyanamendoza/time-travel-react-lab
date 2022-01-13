import { fireEvent, render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import App from './App';

test('meets the requirements of this time travel lab', () => {
  render(<App />)
  const save = screen.getByRole('button', { name: /save/i })
  const undo = screen.getByText(/undo/i)
  const redo = screen.getByText(/redo/i)
  const input = screen.getByLabelText(/date picker/i)
  const dateDisplay = screen.getByTestId(/date-display/i)

  //initial state
  expect(dateDisplay).toHaveTextContent('Choose a date!')

  //actions required for lab

// select a date (e.g. 2022-01-01), see the date change (to 2022-01-01)
  fireEvent.change(input, { target: { value:'2022-01-01' }})
  userEvent.click(save)
  expect(dateDisplay).toHaveTextContent('2022-01-01')
  
// select another date (e.g. 2022-02-22), see the date change to the new date (to 2022-02-22)
  fireEvent.change(input, { target: { value:'2022-02-22' }})
  userEvent.click(save)
  expect(dateDisplay).toHaveTextContent('2022-02-22')

// select another date (e.g. 2022-03-14), see the date change to the new date (to 2022-03-14)
  fireEvent.change(input, { target: { value:'2022-03-14' }})
  userEvent.click(save)
  expect(dateDisplay).toHaveTextContent('2022-03-14')

// press undo, see the date change to the second date (to 2022-02-22)
  userEvent.click(undo)
  expect(dateDisplay).toHaveTextContent('2022-02-22')

// press undo, see the date change to the first date (to 2022-01-01)
  userEvent.click(undo)
  expect(dateDisplay).toHaveTextContent('2022-01-01')

// press redo, see the date change to the second date (to 2022-02-22)
  userEvent.click(redo)
  expect(dateDisplay).toHaveTextContent('2022-02-22')

// select another date (e.g. 2022-04-04), see the date change to the new date (to 2022-04-04)
  fireEvent.change(input, { target: { value:'2022-04-04' }})
  userEvent.click(save)
  expect(dateDisplay).toHaveTextContent('2022-04-04')

// press undo, see the date change to the second date (to 2022-02-22)
  userEvent.click(undo)
  expect(dateDisplay).toHaveTextContent('2022-02-22')

// press undo, see the date change to the first date (to 2022-01-01)
  userEvent.click(undo)
  expect(dateDisplay).toHaveTextContent('2022-01-01')

// press redo, see the date change to the second date (to 2022-02-22)
  userEvent.click(redo)
  expect(dateDisplay).toHaveTextContent('2022-02-22')

// press redo, see the date change to the fourth date (to 2022-04-04)
  userEvent.click(redo)
  expect(dateDisplay).toHaveTextContent('2022-04-04')

// press redo, see the date change to the third date (to 2022-03-14)
  userEvent.click(redo)
  expect(dateDisplay).toHaveTextContent('2022-03-14')
});
