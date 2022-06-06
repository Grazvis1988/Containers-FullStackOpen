import React from 'react';
import { render, screen } from '@testing-library/react';
import ListItem from '../src/Todos/ListItem';


describe('ListItem when todo is not done', () => {
  const todo = {
    text: "some text",
    done: false
  }
  it('text is redered correctly and buttons work', () => {
    const deleteTodo = jest.fn();
    const completeTodo = jest.fn();
    render(<ListItem todo={todo} onClickDelete={deleteTodo} onClickComplete={completeTodo}/>);

    expect(screen.getByText('some text')).toBeInTheDocument();
    expect(screen.getByText('This todo is not done')).toBeInTheDocument();
    const deleteButton = getByText('Delete')
    deleteButton.click()
    const doneButton = getByText('Set as done')
    doneButton.click()
    expect(deleteTodo.mock.calls[0][0].length).toBe(1)
    expect(deleteTodo.mock.calls[0][0]).toBe({
      text: "some text",
      done: false
    })
    expect(completeTodo.mock.calls[0][0].length).toBe(1)
    expect(completeTodo.mock.calls[0][0]).toBe({
      text: "some text",
      done: false
    })
  });
})
