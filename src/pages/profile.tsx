import { useAuth } from "@/context/AuthContext";
import DefaultLayout from "@/layouts/default";
import { Avatar } from "@heroui/avatar";
import { Card, CardHeader } from "@heroui/card";
import { title } from "@/components/primitives";
import { Spinner } from "@heroui/spinner";

const Profile = () => {
  const { user, loading } = useAuth();

  return (
    <DefaultLayout>
      {loading ? (
        <div className="flex flex-col items-center justify-center">
          <p className="text-center py-10 text-gray-500">Cargando perfil...</p>
          <Spinner
            classNames={{ label: "text-foreground mt-4" }}
            variant="gradient"
            color="warning"
          />
        </div>
      ) : user ? (
        <Card className="min-h-[60vh] p-6">
          <CardHeader className="flex items-center gap-4">
            <Avatar
              className="w-20 h-20 text-large"
              src={`https://i.pravatar.cc/150?u=${user.email}`}
            />
            <div>
              <h1 className={title()}>{user.fullName}</h1>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-gray-500">Edad: {user.age}</p>
            </div>
          </CardHeader>
        </Card>
      ) : (
        <p className="text-center py-10 text-gray-500">
          Página en construcción
        </p>
      )}
    </DefaultLayout>
  );
};

export default Profile;
