import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react';
import ListItem from '../Todos/ListItem';

describe("ListItem test", () => {
  describe('ListItem when todo is not done', () => {
    const todo = {
      text: "some text",
      done: false
    }
    it('text is redered correctly and buttons work', async () => {
      const deleteTodo = jest.fn();
      const completeTodo = jest.fn();
      render(<ListItem todo={todo} onClickDelete={deleteTodo} onClickComplete={completeTodo}/>);

      expect(screen.getByText('some text')).toBeInTheDocument();
      expect(screen.queryByText("This todo is done")).not.toBeInTheDocument()
      expect(screen.queryByText('This todo is not done')).toBeInTheDocument()
      
      const deleteButton = screen.getByText('Delete')
      fireEvent.click(deleteButton)
      expect(deleteTodo).toBeCalled()
      expect(deleteTodo.mock.calls.length).toBe(2)
      expect(deleteTodo.mock.calls[0][0]).toEqual({
        text: "some text",
        done: false
      })

      const doneButton = screen.getByText('Set as done')
      fireEvent.click(doneButton)
      expect(completeTodo).toBeCalled()
      expect(completeTodo.mock.calls.length).toBe(1)
      expect(completeTodo.mock.calls[0][0]).toEqual({
        text: "some text",
        done: false
      })
    });
  })
  describe('ListItem when todo is done', () => {
    const todo = {
      text: "some gibrish",
      done: true
    }
    it('text is redered correctly', () => {
      const deleteTodo = jest.fn();
      const completeTodo = jest.fn();
      render(<ListItem todo={todo} onClickDelete={deleteTodo} onClickComplete={completeTodo}/>);

      expect(screen.getByText('some gibrish')).toBeDefined();
      expect(screen.getByText("This todo is done")).toBeDefined();
      expect(screen.queryByText("This todo is not done")).toBeNull();

      const deleteButton = screen.getByText("Delete")
      fireEvent.click(deleteButton)
      expect(completeTodo).toBeCalled()
      expect(completeTodo.mock.calls.length).toBe(1)
      expect(completeTodo.mock.calls[0][0]).toEqual({
        text: "some gibrish",
        done: true
      })

    })
  })
})
