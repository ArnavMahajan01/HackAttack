const Post = require('../models/Post')
const PostJoin = require('../models/PostJoin')

exports.createPost = async (req, res)=>{
    const {userId, title, desc, date, typeofuser, orgdata} = req.body;


    try{
        let orginfo = {};
        if(orgdata){
            orginfo.orgdata = orgdata;
            orginfo.orgdata.peoplejoined = 0;
        }
        if(typeofuser == "organization" && !orginfo){
            return res.status(400).json({
                error:"organization data not given for post"
            })
        }
        const post = new Post({
            userId: userId,
            title: title,
            desc: desc,
            date: date,
            typeofuser: typeofuser,
            ...orginfo
        })
        await post.save();
        res.status(201).json({
            msg:"Successfully created post",
            data: post.toJSON()
        })
    }catch(error){
        res.status(400).json({
            msg:"There was an error",
            error: error
        })
    }
}

exports.joinPost = async (req, res)=>{
    const {userId, postId} = req.body;

    try{
        const joinDoc = await PostJoin.findOne({
            userId: userId,
            postId: postId
        })

        if(joinDoc){
            throw "User already joined";
        }
        const post = Post.findOne({_id: postId});
        if(post.maxpeople == post.peoplejoined){
            throw "Max amount of people joined"
        }

        const newJoinDoc = new PostJoin({
            userId: userId,
            postId: postId
        })
        post.peoplejoined++;
        await newJoinDoc.save();
        await post.save();

        res.status(200).json({
            msg:"Added user"
        })
    }catch(error){
        res.status(400).json({
            msg:"There was an error",
            error: error
        })
    }
}