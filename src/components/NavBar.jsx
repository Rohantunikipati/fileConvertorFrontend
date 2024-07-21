import React from 'react'
import { Button } from './ui/button'
import About from './About'
import { GitBranchIcon, Github } from 'lucide-react'

const NavBar = () => {
  return (
    <div className='w-full h-20 flex items-center border-b justify-between px-20  absolute top-0'>
        <div className='text-2xl font-semibold'>FileConvertor</div>
        <div className='flex items-center justify-center gap-5'>
            <About />
            <Button className="flex items-center gap-2"> <Github className='w-4 h-4' /> GitHub</Button>
        </div>
    </div>
  )
}

export default NavBar