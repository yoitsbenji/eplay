import { useEffect, useState } from 'react'
import Banner from '../../components/Banner'
import ProductsList from '../../components/ProductsList'
import resident from '../../assets/images/resident.png'
import zelda from '../../assets/images/zelda.png'
import diablo from '../../assets/images/diablo.png'
import starwars from '../../assets/images/star_wars.png'

import { useGetOnSaleQuery, useGetSoonQuery } from '../../services/api'

export interface GalleryItem {
  type: 'image' | 'video'
  url: string
}

export type Game = {
  id: number
  name: string
  description: string
  release_date?: string
  prices: {
    discount?: number
    old?: number
    current?: number
  }
  details: {
    category: string
    system: string
    developer: string
    publisher: string
    languages: string[]
  }
  media: {
    thumbnail: string
    cover: string
    gallery: GalleryItem[]
  }
}

const Home = () => {
  const { data: onSale } = useGetOnSaleQuery()
  const { data: comingSoon } = useGetSoonQuery()

  if (onSale && comingSoon) {
    return (
      <>
        <Banner />
        <ProductsList
          games={onSale}
          title="Promoções"
          background="gray"
          id="on-sale"
        />
        <ProductsList
          games={comingSoon}
          title="Em breve"
          background="black"
          id="coming-soon"
        />
      </>
    )
  }

  return <h4>Carregando...</h4>
}
export default Home
