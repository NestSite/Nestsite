import express from 'express';
import { isAuthenticated } from '../../middlewares/merchant-middlewares/isAuth';
import { CustomRequest } from '../../utils/merchant/CustomRequest';
import prisma from '../../database/db';

const router = express.Router();

// Get all Projects by Portfolio
router.get('/:portfolioId/projects', isAuthenticated, async (req: CustomRequest, res, next) => {
    try {
        const { portfolioId } = req.params;
        const projects = await prisma.project.findMany({
            where: { portfolioId }
        });
        res.status(200).json({ projects });
    } catch (error) {
        next(error);
    }
});

// Create a Project
router.post('/:portfolioId/projects', isAuthenticated, async (req: CustomRequest, res, next) => {
    try {
        const { portfolioId } = req.params;
        const { name, liveUrl, imageUrl, description } = req.body;

        const project = await prisma.project.create({
            data: {
                portfolioId,
                name,
                liveUrl,
                imageUrl,
                description
            }
        });

        res.status(201).json({ message: 'Project created successfully', project });
    } catch (error) {
        next(error);
    }
});

// Edit a Project
router.put('/:portfolioId/projects/:projectId', isAuthenticated, async (req: CustomRequest, res, next) => {
    try {
        const { projectId } = req.params;
        const { name, liveUrl, imageUrl, description } = req.body;

        const existingProject = await prisma.project.findUnique({
            where: { id: projectId }
        });

        if (!existingProject) {
            return res.status(404).json({ message: 'Project not found' });
        }

        const updatedProject = await prisma.project.update({
            where: { id: projectId },
            data: {
                name,
                liveUrl,
                imageUrl,
                description
            }
        });

        res.status(200).json({ message: 'Project updated successfully', updatedProject });
    } catch (error) {
        next(error);
    }
});

// Delete a Project
router.delete('/:portfolioId/projects/:projectId', isAuthenticated, async (req: CustomRequest, res, next) => {
    try {
        const { projectId } = req.params;

        const existingProject = await prisma.project.findUnique({
            where: { id: projectId }
        });

        if (!existingProject) {
            return res.status(404).json({ message: 'Project not found' });
        }

        await prisma.project.delete({
            where: { id: projectId }
        });

        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
        next(error);
    }
});

export { router as ProjectRouter };
