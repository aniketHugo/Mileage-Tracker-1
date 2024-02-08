const FetchUsers = async (realm) => {
  try {
    console.log("Fetch User :- called")
    const users = await realm.objects('User');

    
    
    // console.log('Fetched Users:', users);
    return users;
  } catch (error) {
    console.error('Error in fetching users:', error);
  }
};


export default FetchUsers;
