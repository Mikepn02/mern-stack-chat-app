
import User from '../models/User.js '

/*read*/

export const getUser = async(req,res) => {
    try{

        const {id} = req.params
        const user = await User.findById(id);
        res.status(200).json(user);

    }catch(err) {
        res.status(404).json({
            message: err.nessage
        })
    }
}

export const getUserFriends =  async(req,res) => {
  try{
    const {id} = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
        user.friends.map((id) => User.findById(id))
    ); 
    //we gonna make  multiple calls to the database that why we used promise

    const formattedFriend = friends.map(({_id,firstName,lastName,occupation,location,picturePath}) => {
        return {_id,firstName,lastName,occupation,location,picturePath};
    })
    res.status(200).json(formattedFriend)
  }catch(err) {
    res.status(500).json({message: err.message})
  }

 }

//  update

export const addRemoveFriend = async(req,res) => {
    try {
        const {id ,friendId} = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        if(user.friends.includes(friendId)) {
            user.friends = user.friends.filter((id) =>  id !== friendId);
            friend.friends = user.friends.filter((id) =>  id !== id);
        }else {
            user.friends.push(friendId);
            friend.friends.push(id);
        }
        await user.save();
        await friend.save();

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        ); 
        // the code uses Promise.all to fetch the complete User objects of all the friends in the user's friends list. 
        //we gonna make  multiple calls to the database that why we used promise
    
        const formattedFriend = friends.map(({_id,firstName,lastName,occupationm,location,picturePath}) => {
            return {_id,firstName,lastName,occupationm,location,picturePath};
        })

        res.status(200).json(formattedFriend);

    }catch(err) {
        res.status(500).json({message: err.message})
    }
}
