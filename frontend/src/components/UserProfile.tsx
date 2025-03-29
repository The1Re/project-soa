import { User } from "../models/User";

const UserProfile = ({ username, image }: User) => {
  console.log(image);
  return (
    <div className="flex items-center space-x-4">
      <div className="bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-md">
        <img
          src="https://lh3.googleusercontent.com/a/ACg8ocIBMs8NDn5p6Jkaqiy89pY7Xn4L6OEGUF9-uuwoLRUbCttFPw=s96-c"        
        />
      </div>
      <div className="text-gray-800 font-medium">{username}</div>
    </div>
  );
}

export default UserProfile;

