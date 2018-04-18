import React from 'react';
import {Profile} from '../screens/Profile.js';
import renderer from 'react-test-renderer';
import "isomorphic-fetch"

test('renders correctly', () => {
  const tree = renderer.create(<Profile user={{photoUrl: 'https//mock_email', name: 'mock_name'}}/>).toJSON();
  expect(tree).toMatchSnapshot();
});
