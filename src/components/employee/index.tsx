import React, { useState } from 'react';
import { Table } from 'antd';

import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

// import './index.less'

import QueryForm from './QueryForm';

import { employeeColumns } from './columns';
import { EmployeeRequest, EmployeeResponse } from '../../interface/employee';
import { getEmployee } from '../../redux/employee';

interface Props {
  onGetEmployee(param: EmployeeRequest): void;
  employeeList: EmployeeResponse;
}

const Employee = (props: Props) => {
  // const [employee, setEmployee] = useState<EmployeeResponse>(undefined);
  const { employeeList, onGetEmployee } = props;

  // const getTotal = () => {
  //   let total: number;
  //   //类型保护
  //   if (typeof employee !== 'undefined') {
  //     total = employee.length;
  //   } else {
  //     total = 0;
  //   }
  //   return <p>共 {total} 名员工</p>;
  // };
  return (
    <>
      <QueryForm getData={onGetEmployee} />
      {/* {getTotal()} */}
      <Table
        columns={employeeColumns}
        dataSource={employeeList}
        className="table"
      />
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    employeeList: state.employee.employeeList
  };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      onGetEmployee: getEmployee
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Employee);
