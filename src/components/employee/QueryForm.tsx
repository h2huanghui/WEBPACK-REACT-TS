import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Button } from 'antd';

import { EmployeeRequest, EmployeeResponse } from '../../interface/employee';
import { get } from '../../utils/request';
import { GET_EMPLOYEE_URL } from '../../constants/urls';

const { Option } = Select;

interface Props {
  // onDataChange(data: EmployeeResponse): void;
  getData(param: EmployeeRequest): void;
}

const QueryForm = (props: Props) => {
  const [name, setName] = useState('');
  const [departmentId, setDepartmentId] = useState<number | undefined>();

  useEffect(() => {
    queryEmployee({ name, departmentId });
  }, []);

  const handleNameChange = (e: React.FormEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };

  const handleDepartmentChange = (value: number) => {
    setDepartmentId(value);
  };

  const handleSubmit = () => {
    queryEmployee({ name, departmentId });
  };

  const queryEmployee = (param: EmployeeRequest) => {
    console.log(param);
    // get(GET_EMPLOYEE_URL, param).then((res) => {
    //   console.log('res', res.data);
    //   props.onDataChange(res.data);
    // });
    props.getData(param);
  };

  return (
    <>
      <Form layout="inline" name="query-form">
        <Form.Item>
          <Input
            placeholder="姓名"
            style={{ width: 120 }}
            allowClear
            value={name}
            onChange={handleNameChange}
          />
        </Form.Item>

        <Form.Item>
          <Select
            placeholder="部门"
            style={{ width: 120 }}
            allowClear
            value={departmentId}
            onChange={handleDepartmentChange}
          >
            <Option value={1}>技术部</Option>
            <Option value={2}>产品部</Option>
            <Option value={3}>市场部</Option>
            <Option value={4}>运营部</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" onClick={handleSubmit}>
            查询
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default QueryForm;
