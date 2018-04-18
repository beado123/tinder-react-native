import React from 'react';
import {Login} from '../screens/Login.js';
import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(<Login user={{photoUrl: 'https//mock_email', name: 'mock_name'}}  />).toJSON();
  expect(tree).toMatchSnapshot();
});
