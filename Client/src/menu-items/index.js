import { dashboard } from './dashboard';
import { dashboard1 } from './home';
import { dashboard2 } from './rikin';
import { utilities } from './utilities';
import { other } from './other';
import { StudentMenu } from './StudentMenu';
import { CompanyMenu } from './CompanyMenu';
import { AnnouncementMenu } from './AnnouncementMenu';
import { ProfileMenu } from './Student/ProfileMenu';
import { AnnouncementStudentMenu } from './Student/AnnouncementStudentMenu';
import { PlacementMenu } from './PlacementMenu';
import { InternshipMenu } from './InternshipMenu';
import { ReportMenu } from './ReportMenu';
import { AchievementsMenu } from './Student/AchievementsMenu';
import { AdminDashboard } from './AdminDashboard';
import { AboutMenu } from './Student/AboutMenu';
import { useLocation } from 'react-router';


//-----------------------|| MENU ITEMS ||-----------------------//

const current_location = window.location.href.split("/")
let menuItems


if (current_location[3] == "_student" || current_location[3] == "") {
    console.log(current_location)
    console.log("Here in student")
    menuItems = {
        items: [ProfileMenu, AchievementsMenu, AnnouncementStudentMenu, AboutMenu]
    }
}

else {
    console.log(current_location)
    console.log("Here in admin")
    menuItems = {

        items: [AdminDashboard, StudentMenu, PlacementMenu, InternshipMenu, AnnouncementMenu, CompanyMenu, ReportMenu]
    };
}


export default menuItems;
