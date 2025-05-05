import DefaultLayout from "@/layouts/default";

const Profile = () => {
  const handleLogout = () => {
    // Aquí pondremos la lógica de cerrar sesión
  };

  return (
    <DefaultLayout>
      <div className="flex min-h-[80vh] items-start justify-center pt-12 px-4">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
              Mi Perfil
            </h1>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleLogout}
              className="mt-6 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded transition"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Profile;

