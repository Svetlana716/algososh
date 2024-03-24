import { Button } from './button';
import { render, fireEvent } from '@testing-library/react';
import renderer from 'react-test-renderer';

describe ('button test case', () => {
    test ('button with text', () => {
    const tree = renderer
      .create(<Button text="text" />)
      .toJSON();

      expect(tree).toMatchSnapshot();
  });

  test ('button without text', () => {
    const tree = renderer
      .create(<Button />)
      .toJSON();

      expect(tree).toMatchSnapshot();
  });

  test ('disabled button', () => {
    const tree = renderer
      .create(<Button disabled />)
      .toJSON();

      expect(tree).toMatchSnapshot();
  });

  test ('button with loader', () => {
    const tree = renderer
      .create(<Button isLoader />)
      .toJSON();

      expect(tree).toMatchSnapshot();
  });

  test ('button click callback', () => {
    const handleClick = jest.fn();
    const { container } = render(<Button onClick={handleClick}/>);
    const button = container.firstChild;
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

});