import React from 'react';
import { Button } from 'antd';

interface Greeting {
  name: string;
  firstName: string;
  lastName: string;
}

const Hello = (props: Greeting) => <Button>{props.name}</Button>;

// const Hello: React.FC<Greeting> = ({
//   name,
//   firstName,
//   lastName,
//   children
// }) => <Button>{name}</Button>;

Hello.defaultProps = {
  firstName: '',
  lastName: ''
};

export default Hello;
