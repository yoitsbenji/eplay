import ProductsList from '../../components/ProductsList'
import resident from '../../assets/images/resident.png'
import zelda from '../../assets/images/zelda.png'
import diablo from '../../assets/images/diablo.png'
import starwars from '../../assets/images/star_wars.png'
import { Game } from '../Home'
import { useEffect, useState } from 'react'

import {
  useGetActionQuery,
  useGetSportsQuery,
  useGetSimulationQuery,
  useGetFightQuery,
  useGetRPGQuery
} from '../../services/api'

const Categories = () => {
  const { data: Action } = useGetActionQuery()
  const { data: Sports } = useGetSportsQuery()
  const { data: Simulation } = useGetSimulationQuery()
  const { data: Fight } = useGetFightQuery()
  const { data: RPG } = useGetRPGQuery()

  if (Action && Sports && Simulation && Fight && RPG) {
    return (
      <>
        <ProductsList
          id="action"
          games={Action}
          title="Ação"
          background="black"
        />
        <ProductsList
          id="sports"
          games={Sports}
          title="Esportes"
          background="gray"
        />
        <ProductsList
          id="simulation"
          games={Simulation}
          title="Simulação"
          background="black"
        />
        <ProductsList id="fight" games={Fight} title="Luta" background="gray" />
        <ProductsList id="rpg" games={RPG} title="RPG" background="black" />
      </>
    )
  }

  return <h4>Carregando...</h4>
}
export default Categories
