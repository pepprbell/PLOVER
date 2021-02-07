import { Route } from 'react-router-dom';
import {
  Jangsoon, Jiyoung, Suyeon,
  Register, Verify, Login, Home,
  MRegister, MList, MDetail,
  SRegister, SList, SDetail,
  Search
} from './pages';
import styles from "./App.module.css"
import "./global.color.css";


function App() {
  return (
    <div className={styles.App}>
      <Route exact path="/" component={Jangsoon} />
      <Route path="/jangsoon" component={Jangsoon} />
      <Route path="/jiyoung" component={Jiyoung} />
      <Route path="/suyeon" component={Suyeon} />
      <Route path="/register" component={Register} />
      <Route path="/verify" component={Verify} />
      <Route path="/login" component={Login} />
      <Route path="/home" component={Home} />
      <Route path="/mentoring/register" component={MRegister} />
      <Route path="/mentoring/list" component={MList} />
      <Route path="/mentoring/detail" component={MDetail} />
      <Route path="/study/register" component={SRegister} />
      <Route path="/study/list" component={SList} />
      <Route path="/study/detail" component={SDetail} />
      <Route path="/search" component={Search} />
    </div>
  );
}

export default App;
