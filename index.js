import Mvvm from './src/mvvm'

let mvvm = new Mvvm({
  el: '#root',
  data: {
    name: '无始大帝',
    friends: ['狠人大帝', '叶凡', '黑皇'],
    detail: {
      desc: '仙路尽头谁为峰，一见无始道成空',
      martialArts: '无始经',
      record: {
        a: '独自一人于仙路对决不死天皇和奇异世界土著红尘仙级强者',
        b: '与叶凡，狠人，段德击败帝尊',
        c: '与叶凡，狠人，段德四位红尘仙击破仙界壁垒，进入仙界',
        d: '准仙帝境界时，与叶凡，狠人三位准仙帝联手跨越时间长河，逆流而上，寻找荒天帝，击杀一同追来的三位准仙帝敌人',
        e: '魂河尽头，古地府，天帝葬坑，上苍以及上苍之上等祸乱源头出来灭世，与叶凡，狠人一起联手对抗，最终遭受围攻而死，叶凡重伤躺棺材，用天帝鼎堵住敌人来路，狠人远遁，寻找希望'
      }
    }
  },
  template: `<div>
      <h1>称：{{name}}</h1>
      <h2>战友：{{friends[0]}}，{{friends[1]}}，{{friends[2]}}</h2>
      <p>{{detail.desc}}</p>
      <p>{{detail.martialArts}}</p>
      <ul>
        <li>{{detail.record.a}}</li>
        <li>{{detail.record.b}}</li>
        <li>{{detail.record.c}}</li>
        <li>{{detail.record.d}}</li>
        <li>{{detail.record.e}}</li>
      </ul>
    </div>`
})

console.log(mvvm)

setTimeout(() => {
  mvvm.data.name = '叶黑'
  mvvm.data.friends.splice(1, 1, '无始大帝')
  mvvm.data.detail.desc = '吾为天帝，当镇世间一切敌'
  mvvm.data.detail.martialArts = '天帝拳'
}, 2000)

