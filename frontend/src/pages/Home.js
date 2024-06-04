import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <div>
      <CategoryList/>
      <BannerProduct/>

      <HorizontalCardProduct category={"Jebba"} heading={"jebba"}/>
      <HorizontalCardProduct category={"Abaya"} heading={"abaya"}/>
      <VerticalCardProduct category={"Blazer"} heading={"blazer"}/>
      <VerticalCardProduct category={"Ensemble"} heading={"ensemble"}/>
      <VerticalCardProduct category={"Robe"} heading={"robe"}/>
      <VerticalCardProduct category={"Chemise"} heading={"chemise"}/>
      <VerticalCardProduct category={"Jogging"} heading={"jogging"}/>
      <VerticalCardProduct category={"Pull"} heading={"pull"}/>
      <VerticalCardProduct category={"Tenue"} heading={"tenue"}/>
      <VerticalCardProduct category={"Manteaux"} heading={"manteaux"}/>
    </div>
  )
}

export default Home
