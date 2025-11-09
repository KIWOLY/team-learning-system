import React from 'react'
import TeamCard from '../components/TeamCard'

const sampleTeams = [
  { id: 1, name: 'Frontend Learners', description: 'Practice React and UI patterns', members: 6 },
  { id: 2, name: 'Backend Builders', description: 'Django, APIs and databases', members: 4 },
  { id: 3, name: 'Data Enthusiasts', description: 'Data science experiments', members: 5 }
]

export default function Home(){
  return (
    <section>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16}}>
        <div>
          <h1 style={{margin:0}}>Welcome to Team Learning</h1>
          <p style={{marginTop:6, color:'#6b7280'}}>Collaborative learning groups for your team projects.</p>
        </div>
      </div>

      <div>
        <h2 style={{marginTop:0}}>Active Teams</h2>
        <div className="team-grid" style={{marginTop:12}}>
          {sampleTeams.map(t => (
            <TeamCard key={t.id} team={t} />
          ))}
        </div>
      </div>
    </section>
  )
}
