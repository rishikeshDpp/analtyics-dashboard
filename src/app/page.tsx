"use client"
import { AnalyticsHomepage } from "@/components/analytics-homepage";

export default function Home() {
  return (
    <main className="">
        <div className="sidebar">
          <input type="checkbox" id="sidebar-active"/>
          <label htmlFor="sidebar-active" className="open-sidebar-button">
            <svg xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 -960 960 960" width="32"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg>
          </label>
          <label id="overlay" htmlFor="sidebar-active"></label>
          <div className="links-container">
            <label htmlFor="sidebar-active" className="close-sidebar-button">
              <svg xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 -960 960 960" width="32"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
            </label>

            <a href="">About</a> 
            <a href="">Products</a>
            <a href="">Blog</a>
            <a href="">Login</a>
            
          </div>
        </div>
      {/* <AnalyticsHomepage /> */}
    </main>
  );
}
