// Import models
import { AdminModel } from "../models/adminModel"
import { BillModel } from "../models/billModel"
import { CommentModel } from "../models/commentModel"
import { GamificationModel } from "../models/gamificationModel"

import { LikeModel } from "../models/likeModel"
import { MessageModel } from "../models/messageModel"
import { PostModel } from "../models/postModel"
import { ProductModel } from "../models/productModel"
import { UserModel } from "../models/userModel"


import bcrypt from 'bcrypt'




let admin = new AdminModel({
    emailAdmin: "alexis.savoie.555@gmail.com",
    passwordAdmin: bcrypt.hashSync("bonjour11", bcrypt.genSaltSync(10)),
})

let bill = new BillModel({
    numberBill: 9991,
    emailBuyer: "searchBillRoute_user1@email.com",
    description: "300 Domo",
    price: 3.0,
    paymentMethod: "CB",
    idProduct: "vnozehvineozjoejajc"
})

let comment = new CommentModel( {
    idPost: "dzefagrddvzqzdgerzvfzerg",
    emailSender: "commentTest@email.com",
    textContent: "Ceci est est un test de post incroyable",
    replyTo: "dzefagrddvzqedgerzvfzerg",
    haveReport: false
})


let gamification = new GamificationModel({
    emailWinner: "searchGamificationRoute_user1@email.com",
    levelGet: 10,
})


let message = new MessageModel({
    emailSender: "messageTest@email.com",
    emailReceiver: "searchMessageRoute_999@email.com",
    textContent: "Ceci est est un test de message incroyable",
    imageURL: "http://serveur.fr/image.png",
})


let post = new PostModel({
    emailPublisher: "postTest@email.com",
    textContent: "Ceci est est un test de post incroyableee",
    listImage: [{ URL: "www.test.com/image.png" }],
    listLike: [{ id: "hogzjovfzegvivzniovz" }],
    listComment: [{ id: "hogzjovznjoivzniovz" }],
    listReport: [{ id: "jotiobnvznvnzeinicae" }]
})


let product = new ProductModel({
    nameProduct: "searchProductRoute_1",
    description: "Ceci est est un test de produit incroyable",
    price: 1000,
    availableStock: 10,
    imageURL: "www.test.com/image.png",
    listBill: [{ id: "jotiobnvznvnzeinicae" }]
})


let user = new UserModel({
    emailUser: "searchUserRoute_user1@email.com",
    passwordUser: bcrypt.hashSync("bonjour11", bcrypt.genSaltSync(10)),
})


const foo = async () => {
    await admin.save()
    await bill.save()
    await comment.save()
    await gamification.save()
    await message.save()
    await post.save()
    await product.save()
    await user.save()
    console.log("insertion done")
  };

foo()



