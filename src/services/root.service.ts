import { API } from '@/utils/enum';
import { callApi } from './http.service';

const responseObject = {
    "total": 19,
    "leads": [
        {
            "_id": "67c844c9ce78280e8565ea6b",
            "name": {
                "name": "John M",
                "favorite": true
            },
            "phone": "3300001867",
            "assignedAdmin": "67c6d44eca39a9c9c3c3f82e",
            "region": "67c7df011e3e66164e985253",
            "createdAt": "2025-03-05T12:34:17.889Z",
            "updatedAt": "2025-03-07T16:08:20.109Z",
            "__v": 0,
            "assignedOwner": {
                "_id": "67cb19dd97eb04cf8489c931",
                "assignedOwner": "caller@gmail.com",
                "email": "caller@gmail.com"
            },
            "class": "10th Grade",
            "board": "CBSE",
            "leadScore": 85,
            "address": "123 Main Street",
            "phoneNumber": "9876543210",
            "email": "johndoe@example.com",
            "fatherOccupation": "Engineer",
            "motherOccupation": "Doctor",
            "alternativeNumber": "7890123456",
            "parentName": "Mr. and Mrs. Doe",
            "schoolName": "ABC High School",
            "city": "New York",
            "state": "NY",
            "percentage": "92%",
            "interactWith": "Counselor"
        },
        {
            "_id": "67c844bace78280e8565ea62",
            "name": {
                "name": "John l",
                "favorite": true
            },
            "phone": "9900001867",
            "assignedAdmin": "67c6d44eca39a9c9c3c3f82e",
            "region": "67c7df011e3e66164e985253",
            "createdAt": "2025-03-05T12:34:02.417Z",
            "updatedAt": "2025-03-07T16:08:20.109Z",
            "__v": 0,
            "assignedOwner": {
                "_id": "67cb19dd97eb04cf8489c931",
                "assignedOwner": "caller@gmail.com",
                "email": "caller@gmail.com"
            },
            "class": "10th Grade",
            "board": "CBSE",
            "leadScore": 85,
            "address": "123 Main Street",
            "phoneNumber": "9876543210",
            "email": "johndoe@example.com",
            "fatherOccupation": "Engineer",
            "motherOccupation": "Doctor",
            "alternativeNumber": "7890123456",
            "parentName": "Mr. and Mrs. Doe",
            "schoolName": "ABC High School",
            "city": "New York",
            "state": "NY",
            "percentage": "92%",
            "interactWith": "Counselor"
        },
        {
            "_id": "67c844b0ce78280e8565ea59",
            "name": {
                "name": "John K",
                "favorite": true
            },
            "phone": "8900001867",
            "assignedAdmin": "67c6d44eca39a9c9c3c3f82e",
            "region": "67c7df011e3e66164e985253",
            "createdAt": "2025-03-05T12:33:52.549Z",
            "updatedAt": "2025-03-07T16:08:20.109Z",
            "__v": 0,
            "assignedOwner": {
                "_id": "67cb19dd97eb04cf8489c931",
                "assignedOwner": "caller@gmail.com",
                "email": "caller@gmail.com"
            },
            "class": "10th Grade",
            "board": "CBSE",
            "leadScore": 85,
            "address": "123 Main Street",
            "phoneNumber": "9876543210",
            "email": "johndoe@example.com",
            "fatherOccupation": "Engineer",
            "motherOccupation": "Doctor",
            "alternativeNumber": "7890123456",
            "parentName": "Mr. and Mrs. Doe",
            "schoolName": "ABC High School",
            "city": "New York",
            "state": "NY",
            "percentage": "92%",
            "interactWith": "Counselor"
        },
        {
            "_id": "67c844a1ce78280e8565ea50",
            "name": {
                "name": "John j",
                "favorite": true
            },
            "phone": "8900007867",
            "assignedAdmin": "67c6d44eca39a9c9c3c3f82e",
            "region": "67c7df011e3e66164e985253",
            "createdAt": "2025-03-05T12:33:37.798Z",
            "updatedAt": "2025-03-07T16:08:20.109Z",
            "__v": 0,
            "assignedOwner": {
                "_id": "67cb19dd97eb04cf8489c931",
                "assignedOwner": "caller@gmail.com",
                "email": "caller@gmail.com"
            },
            "class": "10th Grade",
            "board": "CBSE",
            "leadScore": 85,
            "address": "123 Main Street",
            "phoneNumber": "9876543210",
            "email": "johndoe@example.com",
            "fatherOccupation": "Engineer",
            "motherOccupation": "Doctor",
            "alternativeNumber": "7890123456",
            "parentName": "Mr. and Mrs. Doe",
            "schoolName": "ABC High School",
            "city": "New York",
            "state": "NY",
            "percentage": "92%",
            "interactWith": "Counselor"
        },
        {
            "_id": "67c84493ce78280e8565ea47",
            "name": {
                "name": "John i",
                "favorite": true
            },
            "phone": "8900007887",
            "assignedAdmin": "67c6d44eca39a9c9c3c3f82e",
            "region": "67c7df011e3e66164e985253",
            "createdAt": "2025-03-05T12:33:23.334Z",
            "updatedAt": "2025-03-07T16:08:20.109Z",
            "__v": 0,
            "assignedOwner": {
                "_id": "67cb19dd97eb04cf8489c931",
                "assignedOwner": "caller@gmail.com",
                "email": "caller@gmail.com"
            },
            "class": "10th Grade",
            "board": "CBSE",
            "leadScore": 85,
            "address": "123 Main Street",
            "phoneNumber": "9876543210",
            "email": "johndoe@example.com",
            "fatherOccupation": "Engineer",
            "motherOccupation": "Doctor",
            "alternativeNumber": "7890123456",
            "parentName": "Mr. and Mrs. Doe",
            "schoolName": "ABC High School",
            "city": "New York",
            "state": "NY",
            "percentage": "92%",
            "interactWith": "Counselor"
        }
    ]
}

// const stages = [
//     {
//         "_id": "67cc0c8b1b37841a58ecfcde",
//         "stageid": "stage_fresh",
//         "stageType": "FRESH",
//         "visibility": true,
//         "activeStatuses": [
//             {
//                 "statusid": 1,
//                 "label": "Prospects",
//                 "color": "#828278",
//                 "_id": "67cc0c8b1b37841a58ecfcdf"
//             }
//         ],
//         "archivedStatuses": [],
//         "createdAt": "2025-03-08T09:23:23.338Z",
//         "updatedAt": "2025-03-08T09:23:23.338Z",
//         "__v": 0
//     },
//     {
//         "_id": "67cc0c8b1b37841a58ecfce2",
//         "stageid": "stage_active",
//         "stageType": "ACTIVE",
//         "visibility": true,
//         "activeStatuses": [
//             {
//                 "statusid": 2,
//                 "label": "Qualified",
//                 "color": "#00876c",
//                 "_id": "67cc0c8b1b37841a58ecfce3"
//             },
//             {
//                 "statusid": 5,
//                 "label": "Intrested",
//                 "color": "#822278",
//                 "_id": "67cc0dfc1b37841a58ecfcf9"
//             }
//         ],
//         "archivedStatuses": [
//             { statusid: 3, label: "In Progress", color: "#FF8C00", _id: "67cc0c9d1b37841a58ecfce5" },
//             { statusid: 4, label: "Not Interested", color: "#822278", _id: "67cc0dfc1b37841a58ecfcf9" },
//         ],
//         "createdAt": "2025-03-08T09:23:23.480Z",
//         "updatedAt": "2025-03-08T09:34:20.120Z",
//         "__v": 0
//     },
//     {
//         "_id": "67cc0c8b1b37841a58ecfce6",
//         "stageid": "stage_won",
//         "stageType": "WON",
//         "visibility": true,
//         "activeStatuses": [
//             {
//                 "statusid": 3,
//                 "label": "Enrolled",
//                 "color": "#10de10",
//                 "_id": "67cc0c8b1b37841a58ecfce7"
//             }
//         ],
//         "archivedStatuses": [],
//         "createdAt": "2025-03-08T09:23:23.604Z",
//         "updatedAt": "2025-03-08T09:23:23.604Z",
//         "__v": 0
//     },
//     {
//         "_id": "67cc0c8b1b37841a58ecfcea",
//         "stageid": "stage_lost",
//         "stageType": "LOST",
//         "visibility": true,
//         "activeStatuses": [
//             {
//                 "statusid": 4,
//                 "label": "Not Enrolled",
//                 "color": "#fc1414",
//                 "_id": "67cc0c8b1b37841a58ecfceb"
//             }
//         ],
//         "archivedStatuses": [],
//         "createdAt": "2025-03-08T09:23:23.723Z",
//         "updatedAt": "2025-03-08T09:23:23.723Z",
//         "__v": 0
//     }
// ];


class RootService{

  getTeamMembers = async () => {
    // const url='api/region/read/regions';
    // return await callApi(url,API.GET);
    return responseObject;
  }

  getStages = async () => {
    const url='api/lead_stage/read/all-stages';
    return await callApi(url,API.GET);
    // return stages;
  }

  editStatus = async (payload:{
    "statusid":string,
    "color":string,
    "label":string
    }) => {
        const url='/api/lead_stage/write/create-update/stage_fresh';
        return await callApi(url,API.POST,payload,true);
    }

  deleteStatus = async (payload:{stageId:string,statusId:string}) => {
    const url=`/api/lead_stage/delete/stage/${payload.stageId}/${payload.statusId}`;
    return await callApi(url,API.POST);
  }

  restoreDeletedStatus = async (payload:{stageId:string,statusId:string}) => {
    const url=`/api/lead_stage/write/active/${payload.stageId}/${payload.statusId}`;
    return await callApi(url,API.POST);
  }

  createLeadField = async (payload:{name:string,type:string}) => {
    const url=`/api/lead_field/write/create-or-update`;
    return await callApi(url,API.POST,payload,true);
  }
}

export const RootInstance = new RootService();