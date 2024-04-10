
import { useAuth } from "../../context/AuthContext";
import { NavBar } from "../../components/NavBar";
export function Portal() {
  const { logout, user } = useAuth();

  console.log(user);
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <>
      <NavBar />

      <div class="bg-white">
        <div class="relative isolate px-6 pt-6 lg:px-8">

          <div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">

            <div class="text-center">
              <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Generador de matriz de consistencia </h1>
              <p class="mt-6 text-lg leading-8 text-gray-600">Empieza una nueva aventura de investigación soporta con Inteligencia Artificial.</p>

              <div class=" mt-6 relative ">
                <div class="absolute inset-y-0  left-0  flex items-center m-2 pointer-events-none">
                  <svg class="w-6 h-6 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                  </svg>
                </div>
                <input type="search"  id="default-search" class=" block w-full p-4 ps-10 text-sm pl-9 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Gestiona de Invetarios y Sistema Web ..." required />
                <button type="button" class="absolute inset-y-0 right-0 w-28 mt-2 mr-2 mb-2 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 ">Generate</button>
              </div>
            </div>
          </div>
        </div>
      </div >
    </>
  );
}
