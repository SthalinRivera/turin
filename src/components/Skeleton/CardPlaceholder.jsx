
export function CardPlaceholder() {
    return (
        <>
            <div class="flex flex-wrap justify-center mt-2 bg-gradient-to-r  rounded-lg drop-shadow-lg mx-1">

                <div role="status" class=" flex w-full">

                    <div class="w-full justify-center items-center bg-gray-100 rounded-lg dark:bg-gray-600 p-1 max-w-[460px]">
                            <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-1"></div>
                            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-1"></div>
                            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-1"></div>
                            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-1"></div>
                            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-1"></div>
                            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-1"></div>
                        <div className="flex mt-1" >
                            <div class="h-7 bg-gray-200 rounded-full dark:bg-gray-700 w-[30px] "></div>
                            <div>
                                <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-[100px] mb-1 "></div>
                                <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-[120px] "></div>
                            </div>
                        </div>
                        <div className="mt-2.5 flex justify-between max-w-[410px]">
                            <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-[40px] mb-2.5"></div>
                            <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-[40px] mb-2.5"></div>
                            <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-[40px]  mb-2.5 "></div>
                        </div>
                    </div>
                    <span class="sr-only">Loading...</span>
                </div>

            </div>
        </>
    );
}
