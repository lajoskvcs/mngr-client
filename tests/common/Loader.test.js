import React from 'react';
import renderer from 'react-test-renderer';
import Loader from '../../src/components/common/Loader';
import {expect} from 'jest';

test('Loader should render', () => {
  const component = renderer.create(
    <Loader />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});