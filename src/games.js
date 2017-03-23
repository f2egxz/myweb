import React ,{Component} from 'react'
import './App.css';

class Games extends Component{
    render(){
        return (
            <div className="GLcontainer">
                <p>
                    *为了有最好的用户体验，请使用最新版的
                    <a href="http://www.google.cn/intl/zh-CN/chrome/browser/desktop/index.html">谷歌浏览器</a>
                    打开*
                </p>
                <ul className="GLlist">
                    <li className="GLlistItem"><a href="##"> 一个多米诺骨牌的动画 </a> </li>
                    <li className="GLlistItem"><a href="##"> 抽木棍，看你能抽走多少而不倒呢 </a></li>
                    <li className="GLlistItem"><a href="##"> 这是一个泄愤的好地方 </a> </li>
                    <li className="GLlistItem"><a href="##"> 孤独么，那就来这里转转 </a> </li>
                    <li style={{height:30}}> </li>
                </ul>
            </div>
        )
    }
}

export default Games