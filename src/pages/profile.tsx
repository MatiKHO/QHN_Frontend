import DefaultLayout from "@/layouts/default";
import { Avatar } from "@heroui/avatar";
import { Card, CardHeader } from "@heroui/card";

const Profile = () => {
  return (
    <DefaultLayout>
      <Card className="flex min-h-[80vh] items-start justify-start pt-12 px-4">
        <CardHeader>
          <Avatar
            className="w-20 h-20 text-large"
            src="https://i.pravatar.cc/150?u=a04258114e29026302d"
          />
        </CardHeader>
      </Card>
    </DefaultLayout>
  );
};

export default Profile;
