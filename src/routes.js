import { useRoutes } from "react-router-dom";
import Pages from "./pages";

export default function Router(){
    return useRoutes([
        { path : '/', element:<Pages.Home/>},
        { path : 'newpost', element:<Pages.Newpost/>},
        { path : '*', element:<Pages.NotFound/>},
        { path : 'community', element:<Pages.Community/>},
        { path : 'detail/*', element:<Pages.Detail/>},
        { path : 'matching', element:<Pages.Matching/>},
        { path : 'matchinglist', element:<Pages.MatchingList/>},
        { path : 'timetable', element:<Pages.TimeTable/>},
        { path : 'curriculum', element:<Pages.Curriculum/>},
        { path : 'update', element : <Pages.Communityupdate/>},
        { path : 'matchingcomplete', element : <Pages.MatchingComplete/>},
        { path : 'login', element : <Pages.Login/>},
        { path : 'signup', element : <Pages.SignUp/>},
        { path : 'payment', element : <Pages.Payment/>},
        { path : 'mypage', element : <Pages.MyPage/>},
        { path : 'curriculumdetail',  element : <Pages.CurriculumDetail/>},
    ]);
}