'use client';
import React from "react";
import StatisticsContainer from "@/containers/statisticsContainer";
import { ITableFields } from "@/interfaces";

// const tableData = [
//         {
//             "_id": "67ce6b3f4353d8124a10bef1",
//             "name": {
//                 "name": "reetesh leadC",
//                 "favorite": true
//             },
//             "phone": "9700001868",
//             "assignedAdmin": "67cb17f097eb04cf8489c915",
//             "region": "67cb19be97eb04cf8489c92e",
//             "status": 1,
//             "leadscore": 0,
//             "createdBy": "67cb19dd97eb04cf8489c931",
//             "createdAt": "2025-03-10T04:31:59.037Z",
//             "updatedAt": "2025-03-22T10:40:12.490Z",
//             "__v": 0,
//             "assignedOwner": {
//                 "_id": "67cb19be97eb04cf8489c92e",
//                 "assignedOwner": "Patlu singh",
//                 "email": "manager@gmail.com"
//             },
//             "class": "9th Grade",
//             "board": "CBSE",
//             "address": "123 Main Street",
//             "phoneNumber": "9876543210",
//             "email": "johndoe@example.com",
//             "fatherOccupation": "Engineer",
//             "motherOccupation": "Doctor",
//             "alternativeNumber": "7890123456",
//             "parentName": "Mr. and Mrs. Doe",
//             "schoolName": "ABC High School",
//             "city": "New York",
//             "state": "NY",
//             "percentage": "92%",
//             "interactWith": "Counselor"
//         },
//         {
//             "_id": "67ce69fd7f30e90eb3c6bcb2",
//             "name": {
//                 "name": "reetesh leadB",
//                 "favorite": true
//             },
//             "phone": "9700001867",
//             "assignedAdmin": "67cb17f097eb04cf8489c914",
//             "region": "67cb186197eb04cf8489c916",
//             "status": 1,
//             "createdBy": "67cb19dd97eb04cf8489c931",
//             "createdAt": "2025-03-10T04:26:37.287Z",
//             "updatedAt": "2025-03-10T04:26:37.287Z",
//             "__v": 0,
//             "assignedOwner": null,
//             "class": "9th Grade",
//             "board": "CBSE",
//             "address": "123 Main Street",
//             "phoneNumber": "9876543210",
//             "email": "johndoe@example.com",
//             "fatherOccupation": "Engineer",
//             "motherOccupation": "Doctor",
//             "alternativeNumber": "7890123456",
//             "parentName": "Mr. and Mrs. Doe",
//             "schoolName": "ABC High School",
//             "city": "New York",
//             "state": "NY",
//             "percentage": "92%",
//             "interactWith": "Counselor"
//         },
//         {
//             "_id": "67ce69567a67c6e824266109",
//             "name": {
//                 "name": "reetesh lead",
//                 "favorite": true
//             },
//             "phone": "9500001867",
//             "assignedAdmin": "67cb17f097eb04cf8489c914",
//             "region": "67cb186197eb04cf8489c916",
//             "status": 1,
//             "createdBy": "67cb19dd97eb04cf8489c931",
//             "createdAt": "2025-03-10T04:23:50.190Z",
//             "updatedAt": "2025-03-10T04:23:50.190Z",
//             "__v": 0,
//             "assignedOwner": null,
//             "class": "9th Grade",
//             "board": "CBSE",
//             "address": "123 Main Street",
//             "phoneNumber": "9876543210",
//             "email": "johndoe@example.com",
//             "fatherOccupation": "Engineer",
//             "motherOccupation": "Doctor",
//             "alternativeNumber": "7890123456",
//             "parentName": "Mr. and Mrs. Doe",
//             "schoolName": "ABC High School",
//             "city": "New York",
//             "state": "NY",
//             "percentage": "92%",
//             "interactWith": "Counselor"
//         },
//         {
//             "_id": "67cc01a3ec834502a69566f1",
//             "name": {
//                 "name": "reeteshB",
//                 "favorite": true
//             },
//             "phone": "5500001867",
//             "assignedAdmin": "67cb17f097eb04cf8489c914",
//             "region": "67c7df011e3e66164e985253",
//             "status": 1,
//             "createdAt": "2025-03-08T08:36:51.962Z",
//             "updatedAt": "2025-03-08T08:38:23.389Z",
//             "__v": 0,
//             "assignedOwner": {
//                 "_id": "67cb19dd97eb04cf8489c931",
//                 "assignedOwner": "MotuPatlu Jodi",
//                 "email": "caller@gmail.com"
//             },
//             "class": "10th Grade",
//             "board": "CBSE",
//             "address": "123 Main Street",
//             "phoneNumber": "9876543210",
//             "email": "johndoe@example.com",
//             "fatherOccupation": "Engineer",
//             "motherOccupation": "Doctor",
//             "alternativeNumber": "7890123456",
//             "parentName": "Mr. and Mrs. Doe",
//             "schoolName": "ABC High School",
//             "city": "New York",
//             "state": "NY",
//             "percentage": "92%",
//             "interactWith": "Counselor"
//         },]

    const emptyData:ITableFields[] = [];


const Home: React.FC = () => {

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      <StatisticsContainer data={emptyData} title={'My open Task'} />
      <StatisticsContainer data={emptyData} title={'My Meeting'} />
      <StatisticsContainer data={emptyData} title={'Today Leads'} />
      <StatisticsContainer data={emptyData} title={'My Deals Closing This Month'} />
    </div>
  );
};

export default Home;
