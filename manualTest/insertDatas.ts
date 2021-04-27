// Import models
import { AdminModel } from "../models/adminModel"
import { BillModel } from "../models/billModel"
import { CommentModel } from "../models/commentModel"
import { GamificationModel } from "../models/gamificationModel"
import { LikeModel } from "../models/likeModel"

import { PurchaseModel } from "../models/purchaseModel"
import { MessageModel } from "../models/messageModel"
import { PostModel } from "../models/postModel"
import { ProductModel } from "../models/productModel"
import { UserModel } from "../models/userModel"


import bcrypt from 'bcrypt'




let admin = new AdminModel({
    emailAdmin: "alexis.savoie.555@gmail.com",
    passwordAdmin: bcrypt.hashSync("bonjour11", bcrypt.genSaltSync(10)),
})

let user = new UserModel({
    emailUser: "alexis.savoie.555@gmail.com",
    firstname: 'Alexis',
    lastname: 'Savoie',
    accountType: "association",
    status: "Association Jeu vidéo GAMING",
    passwordUser: bcrypt.hashSync("bonjour11", bcrypt.genSaltSync(10)),
})

let bill = new BillModel({
    _id: "607e8ac9ebeece0dd8291d9f",
    numberBill: 9991,
    emailBuyer: "alexis.savoie.555@gmail.com",
    description: "1000 Domo",
    price: 10.0,
    paymentMethod: "CB",
    idProduct: "507e8ac9ebeece0dd8291d9f",
    createdAt: new Date("2021-04-01")
})


let purchase = new PurchaseModel({
    _id: "607e8ac9ebeece0dd8291d91",
    emailBuyer: "alexis.savoie.555@gmail.com",
    quantity: 1,
    price: 10.0,
    idProduct: "507e8ac9ebeece0dd8291d9f",
    createdAt: new Date("2021-04-01")
})

let purchase2 = new PurchaseModel({
    _id: "607e8ac9ebeece0dd8291d92",
    emailBuyer: "alexis.savoie.555@gmail.com",
    quantity: 1,
    price: 10.0,
    idProduct: "507e8ac9ebeece0dd8291d9f",
    createdAt: new Date("2021-04-01")
})

let purchase3 = new PurchaseModel({
    _id: "607e8ac9ebeece0dd8291d93",
    emailBuyer: "alexis.savoie.555@gmail.com",
    quantity: 1,
    price: 10.0,
    idProduct: "507e8ac9ebeece0dd8291d9f",
    createdAt: new Date("2021-04-01")
})

let purchase4 = new PurchaseModel({
    _id: "607e8ac9ebeece0dd8291d94",
    emailBuyer: "alexis.savoie.555@gmail.com",
    quantity: 1,
    price: 10.0,
    idProduct: "507e8ac9ebeece0dd8291d9f",
    createdAt: new Date("2021-04-01")
})




let comment = new CommentModel( {
    idPost: "607e8ac9ebeece0dd8291d9f",
    emailSender: "alexis.savoie.555@gmail.com",
    textContent: "Ceci est est un test de commentaire incroyable",
    replyTo: "dzefagrddvzqedgerzvfzerg",
    haveReport: false
})


let gamification = new GamificationModel({
    emailWinner: "alexis.savoie.555@gmail.com",
    levelGet: 10,
    createdAt: new Date("2021-04-02")
})

let gamification2 = new GamificationModel({
    emailWinner: "alexis.savoie.555@gmail.com",
    levelGet: 20,
    createdAt: new Date("2021-04-02")
})

let gamification3 = new GamificationModel({
    emailWinner: "alexis.savoie.555@gmail.com",
    levelGet: 30,
    createdAt: new Date("2021-04-03")
})

let gamification4 = new GamificationModel({
    emailWinner: "alexis.savoie.555@gmail.com",
    levelGet: 40,
    createdAt: new Date("2021-04-04")
})


let message = new MessageModel({
    emailSender: "alexis.savoie.555@gmail.com",
    emailReceiver: "searchMessageRoute_999@email.com",
    textContent: "Ceci est est un test de message incroyable",
    imageURL: "http://serveur.fr/image.png",
})


let post = new PostModel({
    _id: "607e8ac9ebeece0dd8291d9f",
    emailPublisher: "alexis.savoie.555@gmail.com",
    textContent: "Ceci est est un test de post incroyableee",
    listImage: [{ URL: "www.test.com/image.png" }],
    listLike: [{ id: "hogzjovfzegvivzniovz" }],
    listComment: [{ id: "hogzjovznjoivzniovz" }],
    listReport: [{ id: "jotiobnvznvnzeinicae" }]
})


let product = new ProductModel({
    _id: "507e8ac9ebeece0dd8291d9f",
    nameProduct: "Produit test 1",
    description: "Ceci est est un test de produit incroyable",
    price: 1000,
    availableStock: 10,
    imageURL: "www.test.com/image.png",
    listBill: [{ id: "jotiobnvznvnzeinicae" }]
})

let product2 = new ProductModel({
    nameProduct: "Produit test 2",
    description: "Ceci est est un test de produit incroyable 2",
    price: 1000,
    availableStock: 10,
    imageURL: "www.test.com/image2.png",
    listBill: []
})





const foo = async () => {
    await admin.save()
    await bill.save() 
    await purchase.save() 
    await purchase2.save() 
    await purchase3.save() 
    await purchase4.save() 
    await comment.save()
    await gamification.save()
    await gamification2.save()
    await gamification3.save()
    await gamification4.save()
    await message.save()
    await post.save()
    await product.save()
    await product2.save()
    await user.save()
    console.log("insertion done")
    process.exit(1)
  };

foo()



