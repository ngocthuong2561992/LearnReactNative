import React, { Component } from 'react';
import { AppRegistry, SectionList, StyleSheet, Text, View, Alert, Platform } from 'react-native';
const apiGetAllEmployee = 'http://192.168.1.79:3000/employee';
const apiInsertNewEmployee = 'http://192.168.1.79:3000/employee/add';
const apiUpdateEmployee = 'http://192.168.1.79:3000/employee/update';

async function getEmployeesFromServer() {
    try {
        let response = await fetch(apiGetAllEmployee);
        let responseJson = await response.json();
        return responseJson.data; //list of foods
    } catch (error) {
        console.error(`Error is : ${error}`);
    }
}
//send post request to insert new data
async function insertEmployeeToServer(params) {
    try {
        let response = await fetch(apiInsertNewEmployee, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params)
        });
        let responseJson = await response.json();
        return responseJson.result;
    } catch (error) {
        console.error(`Error is : ${error}`);
    }
}

async function updateEmployeeToServer(params) {
    try {
        let response = await fetch(apiUpdateEmployee, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params)
        });
        let responseJson = await response.json();
        return responseJson.result;
    } catch (error) {
        console.error(`Error is : ${error}`);
    }
}

export {getEmployeesFromServer};
export {insertEmployeeToServer};
export {updateEmployeeToServer};
