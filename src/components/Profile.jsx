
import CarD from "./card";


function Profile(object) {
    return (
      <CarD
        
        name={object.name}
        img={object.img}
        tel={"Public Repos : "+object.public}
        link={object.url}
        flwr={object.follower} 
        flwng={object.followings}
      />
    );
  }

// function Profile(){
// return createCard();
// }

export default Profile;