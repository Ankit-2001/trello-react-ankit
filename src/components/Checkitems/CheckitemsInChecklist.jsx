import { useState, useEffect } from "react"

import AddCheckitems from "./AddCheckItems"
import { getCheckitems } from "../../Api";
import CheckitemsData from "./CheckitemsData";


function CheckitemsInChecklist({id,idCard}){

    const [checkitems,setCheckitems] = useState([]);

    useEffect(()=>{
        getCheckitems(id)
            .then((data) =>{
                setCheckitems(data);
            })
    },[])

    const addNewCheckitems = (checkitem) =>{
        setCheckitems([...checkitems,checkitem]);
    }

    const deleteCurrentCheckitem = (checkitemId)=>{
        const remainingCheckitems = checkitems.filter((data) =>{
            if(data.id !=checkitemId){
                return true;
            }
        })
        setCheckitems(remainingCheckitems);
    }

    const allCheckitems = checkitems.map((checkitem) =>{
        // console.log(checkitem)
        return (
          <CheckitemsData
            key={checkitem.id}
            {...checkitem}
            idCard={idCard}
            deleteCurrentCheckitem={deleteCurrentCheckitem}
          />
        );
    })

    return (
        <>
            {allCheckitems}
            <AddCheckitems id={id} addNewCheckitems={addNewCheckitems} />
        </>
    )
}

export default CheckitemsInChecklist