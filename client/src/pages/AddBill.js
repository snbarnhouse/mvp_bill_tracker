import React from 'react';
import SideNav from '../components/SideNav'
import CategoryField from '../components/CategoryField';
import BillsForm from '../components/BillsForm';
import { Redirect } from 'react-router-dom'
import Auth from '../utils/auth'
import { QUERY_MY_BILLS } from '../utils/queries';
import { useQuery } from '@apollo/client';


export default function AddBill() {
    const [category, setCategory] = React.useState('');
    const [billObject, setBillObject] = React.useState('electric')

    const token = Auth.loggedIn() ? Auth.getToken() : window.location.assign('/login');

    const {loading, data} = useQuery(QUERY_MY_BILLS);

    const userData = data?.myBills || {};
    if(!token){
      return <Redirect to="/login" />;
    }
    
    if (loading) {
      return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Add a New Bill</h1>
            <p>Select a category to fill the form with existing bill information, or simply begin typing in your new bill information.</p>
            <div>
                <SideNav />
                <CategoryField setCategory={setCategory} setBillObject={setBillObject} userData={userData}/>
                <BillsForm category={category} billObject={billObject} userData={userData}/>
            </div>
        </div>
    )
}