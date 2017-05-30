import React from 'react';
import renderer from 'react-test-renderer';
import Loader from '../../src/components/common/Loader';


test('Loader should render', () => {
  const component = renderer.create(
    <Loader />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});