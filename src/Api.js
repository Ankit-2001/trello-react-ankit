import axios from "axios";

const apiKey = "fd3359bcaac13a0e64bdacbce2258945";
const token =
  "ATTAe1153f1b2e36202ee1703fe0c99af46c661d48bad45f9966d09c49410ff701304883E53A";
const permission = "public";

export function getAllBoards() {
  const url = `https://api.trello.com/1/members/me/boards?key=${apiKey}&token=${token}`;
  return axios.get(url)
          
}

export function createNewBoard(boardName) {
  const url = `https://api.trello.com/1/boards/?name=${boardName}&prefs_permissionLevel=${permission}&defaultLists=false&key=${apiKey}&token=${token}`;
  return axios
    .post(url)
}

export function getAllLists(boardID) {
  const url = `https://api.trello.com/1/boards/${boardID}/lists?key=${apiKey}&token=${token}`;
  return axios
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {throw new Error(err)});
}

export function createNewList(boardId, name) {
  const url = `https://api.trello.com/1/boards/${boardId}/lists?name=${name}&key=${apiKey}&token=${token}`;
  return axios
    .post(url)
    
}

export function getCardData(listID) {
  const url = `https://api.trello.com/1/lists/${listID}/cards?key=${apiKey}&token=${token}`;
  return axios(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => response.data)
    .catch((err) => err);
}

export function createNewCard(listId, name) {
  const url = `https://api.trello.com/1/cards?name=${name}&idList=${listId}&key=${apiKey}&token=${token}`;
  return axios
    .post(url)
    .then((response) => {
      return response.data;
    })
    .catch((err) => err);
}

export function deleteList(listId) {
  const url = `https://api.trello.com/1/lists/${listId}/closed?value=true&key=${apiKey}&token=${token}`;
  return axios(url, {
    method: "PUT",
  })
    .then((response) => response.data)
    .catch((err) => err);
}

export function deleteCard(cardId) {
  const url = `https://api.trello.com/1/cards/${cardId}?key=${apiKey}&token=${token}`;
  return axios(url, {
    method: "DELETE",
  })
    .then((response) => response.data)
    .catch((err) => err);
}

export function getChecklists(cardId) {
  const url = `https://api.trello.com/1/cards/${cardId}/checklists?key=${apiKey}&token=${token}`;

  return axios
    .get(url)
    .then((response) => response.data)
    .catch((err) => err);
}

export function createChecklist(cardId,name) {
  const url = `https://api.trello.com/1/cards/${cardId}/checklists?name=${name}&key=${apiKey}&token=${token}`;
  return axios.post(url)
            .then((response) => response.data)
          .catch((err) => err);
}

export function deleteChecklist(cardId,checklistId){
  const url = `https://api.trello.com/1/cards/${cardId}/checklists/${checklistId}?key=${apiKey}&token=${token}`;

  return axios
    .delete(url)
    .then((response) => response.data)
    .catch((err) => err);
}

export function getCheckitems(checklistId){
  const url = `https://api.trello.com/1/checklists/${checklistId}/checkItems?key=${apiKey}&token=${token}`;

  return axios
    .get(url)
    .then((response) => response.data)
    .catch((err) => err);
}

export function createNewCheckitem(checklistId,name){
  const url = `https://api.trello.com/1/checklists/${checklistId}/checkItems?name=${name}&key=${apiKey}&token=${token}`;
  return axios
    .post(url)
    .then((response) => response.data)
    .catch((err) => err);
}

export function deleteCheckitem(checklistId,checkitemId){
  const url = `https://api.trello.com/1/checklists/${checklistId}/checkItems/${checkitemId}?key=${apiKey}&token=${token}`;
  return axios
    .delete(url)
    .then((response) => response.data)
    .catch((err) => err);
}


export function updateCheckitem(cardId,checkitemId,state){
  const url = `https://api.trello.com/1/cards/${cardId}/checkItem/${checkitemId}?state=${state}&key=${apiKey}&token=${token}`;

  return axios.put(url)
            .then((response) => response.data)
            .catch((err)=>err)
}