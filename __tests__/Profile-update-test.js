import React from 'react';
import {Profile} from '../screens/Profile-update.js';
import renderer from 'react-test-renderer';

test('renders correctly', () => {
    spyOn(console, 'error');
  const tree = renderer.create(<Profile-update user={{photoUrl: 'https//mock_email', name: 'mock_name'}}/>).toJSON();
  expect(tree).toMatchSnapshot();
});
