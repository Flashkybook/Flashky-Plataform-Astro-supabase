import { assert, describe, expect, test } from 'vitest';
import { Browser, BrowserErrorCaptureEnum } from 'happy-dom';
import {render, screen} from '@testing-library/preact'
import StudySession from '../components/ui/StudyInterface.preact.tsx'



describe('Session Work', async () => {
    test('Render', async () => {

        render(<StudySession/>)

        expect(screen.getByText("Study Session")).toBeDefined()
        expect("").toBeDefined()
    })

    test('Render', async () => {

        render(<StudySession/>)

        expect(screen.getByText("Study Session")).toBeDefined()
        expect("").toBeDefined()
    })

    
})