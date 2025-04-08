import { API } from '@/utils/enum';
import { callApi } from './http.service';
import { CreatedLeadField, IEditStatus } from '@/interfaces/root.interface';

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


class RootService{

  getTeamMembers = async () => {
    // const url='api/region/read/regions';
    // return await callApi(url,API.GET);
    return responseObject;
  }

  createStatus = async (statusCreated:IEditStatus) => {
    const payload = {
        'statusid':statusCreated.statusid,
        'color':statusCreated.color,
        'label':statusCreated.label
    }
    const url='/api/lead_stage/write/create-update/stage_active';
    return await callApi(url,API.POST,payload,true);
    // return stages;
  }

  createInitialStatus = async (statusCreated:IEditStatus) => {
    const payload = {
        'statusid':statusCreated.statusid,
        'color':statusCreated.color,
        'label':statusCreated.label
    }
    const url='/api/lead_stage/write/create-update/stage_fresh';
    return await callApi(url,API.POST,payload,true);
    // return stages;
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
        const url='/api/lead_stage/write/create-update/stage_active';
        return await callApi(url,API.POST,payload,true);
    }

  editInitialStatus = async (payload:{
    "statusid":string,
    "color":string,
    "label":string
    }) => {
        const url='/api/lead_stage/write/create-update/stage_fresh';
        return await callApi(url,API.POST,payload,true);
  }

  editCloseStatus = async (payload:{
    "statusid":string,
    "color":string,
    "label":string
    },statusId:string) => {
        const url=`/api/lead_stage/write/create-update/${statusId}`;
        return await callApi(url,API.POST,payload,true);
  }

  deleteStatus = async (payload:{stageId:string,statusId:string}) => {
    const url=`/api/lead_stage/delete/stage/${payload.stageId}/${payload.statusId}`;
    return await callApi(url,API.POST);
  }

  deleteInitialStatus = async (payload:{stageId:string,statusId:string}) => {
    const url=`/api/lead_stage/delete/stage/${payload.stageId}/${payload.statusId}`;
    return await callApi(url,API.POST);
  }

  restoreDeletedStatus = async (payload:{stageId:string,statusId:string}) => {
    const url=`/api/lead_stage/write/active/${payload.stageId}/${payload.statusId}`;
    return await callApi(url,API.POST);
  }

  restoreDeletedInitialStatus = async (payload:{stageId:string,statusId:string}) => {
    const url=`/api/lead_stage/write/active/${payload.stageId}/${payload.statusId}`;
    return await callApi(url,API.POST);
  }

  createLeadField = async (payload:{name:string,type:string,options:string[],required:boolean,active:boolean,isForm:boolean,columnColor:string}) => {
    const url=`/api/lead_field/write/create-or-update`;
    const payload2 = {
        'name':payload.name,
        'type':payload.type.toLocaleUpperCase(),
        'options':payload.options,
        'required':payload.required,
        'active':payload.active,
        'isForm':payload.isForm,
        'columnColor':payload.columnColor
    }
    console.log("filed payloadddd now check",payload2);
    return await callApi(url,API.POST,payload2,true);
  }

  LeadFieldVisibility = async (id:string,visibility:boolean,isForm:boolean) => {
    console.log("check isForm",isForm);
    const url=`/api/lead_field/write/create-or-update/${id}`;
    const payload2 = {
      'active':!visibility
    }
    
    return await callApi(url,API.POST,payload2,true);
  }

  getCreatedLeadFields = async (): Promise<CreatedLeadField[]> => {
    const url = "/api/lead_field/read/get-all-fields";
    console.log("yes getting total fields");
    return await callApi(url, API.GET);
  };

  EditLeadFields = async (name:string,type:string,options:string[],_id:string,selectedColor:string,active:boolean,mandatory:boolean,isForm:boolean) => {
    const payload = {
      "name":name,
      "type":type,
      "options":options,
      "active":active,
      "required":mandatory,
      "isForm":isForm,
      "columnColor":selectedColor,
        "columnIconCode": '',
        "position":15

    }
    console.log("edit payload",payload);
    const url = `/api/lead_field/write/create-or-update/${_id}`;
    console.log("check url",url);
    return await callApi(url, API.POST,payload,true);
  };

  DeleteLeadFields = async (id:string) => {
    const url = `/api/leadField/delete/${id}`;
    return await callApi(url, API.DELETE);
  };
}

export const RootInstance = new RootService();