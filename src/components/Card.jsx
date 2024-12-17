
import Avatar from "./avatar";
import Detail from "./detail";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';


function CarD(props) {
  return (
    <div className="cards">
      <div className="top">
        <h2 className="name">{props.name}<span><a href={props.link} target="blank"><Detail detailInfo=<OpenInNewIcon/> /></a></span>
        </h2>
        <Avatar img={props.img} />
      </div>
      <div className="bottom">
       
        <div className="followBox">
        <div className="follow">
          <div><h4>following: </h4>
                <p>{props.flwng || 0}</p></div>
        </div>
        <div className="follow">
        <div><h4>followers: </h4>
        <p>{props.flwr || 0}</p></div>
        </div>

        </div>
        <Detail detailInfo={props.tel} />
        
      </div>
    </div>
  );
}

export default CarD;
