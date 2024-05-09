
import { useAuth } from "../../context/AuthContext";
import { NavBar } from "../NavBar";
export function Footer() {


    return (
        <>
            <footer class="w-full">
         <div>
                    <div class="py-7 border-t border-gray-200">
                        <div class="flex items-center justify-center flex-col gap-7 lg:justify-between lg:flex-row">
                            <span class="text-sm text-gray-500 ">©<a href="https://pagedone.io/">pagedone</a> 2024, All rights reserved.</span>
                            <ul class="flex items-center text-sm text-gray-500 gap-9">
                                <li><a href="#">create</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
