import { Circle } from "./circle";
import { ElementStates } from "../../../types/element-states";
import { screen, render, fireEvent } from '@testing-library/react';
import renderer from 'react-test-renderer';

describe('circle test case', () => {
    test ('circle with letters', () => {
        const tree = renderer
          .create(<Circle letter={'letter'} />)
          .toJSON();
    
          expect(tree).toMatchSnapshot();
      });

      test ('circle without letters', () => {
        const tree = renderer
          .create(<Circle />)
          .toJSON();
    
          expect(tree).toMatchSnapshot();
      });

      test ('circle with head', () => {
        const tree = renderer
          .create(<Circle letter={'letter'} head={'head'}/>)
          .toJSON();
    
          expect(tree).toMatchSnapshot();
      });

      test ('circle with circle in head', () => {
        const tree = renderer
          .create(<Circle letter={'letter'} head={<Circle letter={'letter'}/>}/>)
          .toJSON();
    
          expect(tree).toMatchSnapshot();
      });

      test ('circle with tail', () => {
        const tree = renderer
          .create(<Circle letter={'letter'} tail={'tail'}/>)
          .toJSON();
    
          expect(tree).toMatchSnapshot();
      });

      test ('circle with circle in tail', () => {
        const tree = renderer
          .create(<Circle letter={'letter'} tail={<Circle letter={'letter'}/>}/>)
          .toJSON();
    
          expect(tree).toMatchSnapshot();
      });

      test ('circle with index', () => {
        const tree = renderer
          .create(<Circle index={0} />)
          .toJSON();
    
          expect(tree).toMatchSnapshot();
      });

      test ('small circle', () => {
        const tree = renderer
          .create(<Circle isSmall />)
          .toJSON();
    
          expect(tree).toMatchSnapshot();
      });

      test ('default circle', () => {
        const tree = renderer
          .create(<Circle state={ElementStates.Default} />)
          .toJSON();
    
          expect(tree).toMatchSnapshot();
      });

      test ('changing circle', () => {
        const tree = renderer
          .create(<Circle state={ElementStates.Changing} />)
          .toJSON();
    
          expect(tree).toMatchSnapshot();
      });

      test ('modified circle', () => {
        const tree = renderer
          .create(<Circle state={ElementStates.Modified} />)
          .toJSON();
    
          expect(tree).toMatchSnapshot();
      });
});