const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');
const { User } = require("./models/User");

const config = require('./config/key');

// application/x-www-form-urlencoded 타입 분석해서 가져올 수 있음
app.use(bodyParser.urlencoded({extended: true}));

// application/json 타입 분석해서 가져올 수 있음
app.use(bodyParser.json());


const mongoose = require('mongoose')
mongoose.connect(config.mongoURI)
  .then(() => console.log('MongoDB Conntected...'))
  .catch(err => console.log(err))

  
app.get('/', (req, res) => {
  res.send('Hello World! 새해 복 많이 받으세요!!')
})

app.post('/register', (req, res) => {

  // 회원 가입할 때 필요한 정보들을 client에서 가져오면
  // 그것들을 데이터 베이스에 넣어준다.



    const user = new User(req.body)

    user.save((err, userInfo) => {
      // 실패시 json 형식으로 err 메세지 출력
      if(err) return res.json({ success: false, err})
      // 성공하면 200페이지
      return res.status(200).json({
        success: true
      })
    })


})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})